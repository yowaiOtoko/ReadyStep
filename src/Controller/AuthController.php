<?php

namespace App\Controller;

use App\Entity\User;

use Psr\Log\LoggerInterface;
use Firebase\Auth\Token\Verifier;
use Kreait\Firebase\Contract\Auth;
use Doctrine\ORM\EntityManagerInterface;
use Kreait\Firebase\Exception\AuthException;
use Symfony\Component\HttpFoundation\Request;
use Firebase\Auth\Token\Exception\InvalidToken;
use Kreait\Firebase\Auth\SignIn\FailedToSignIn;
use Symfony\Component\Routing\Annotation\Route;
use Kreait\Firebase\Exception\FirebaseException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Contracts\Translation\TranslatorInterface;
use Symfony\Bundle\FrameworkBundle\Translation\Translator;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AuthController extends AbstractController
{
    public function __construct(
        private LoggerInterface $logger,
        private EntityManagerInterface $em,
    ){
    }

    /**
     * @Route("/login", name="api_login", methods={"POST"})
     */
    public function login(Auth $auth, Request $request, JWTTokenManagerInterface $jwtManager): JsonResponse
    {
        try{

            $payload = json_decode($request->getContent(), false);

            dump($payload);

            $signInResult = $auth->signInWithEmailAndPassword($payload->email, $payload->password);


            $user = $this->em->getRepository(User::class)->findOneBy(['email' => $payload->email]);
            if(!$user){
                $firebaseUid = $auth->parseToken($signInResult->idToken())->claims()->get('user_id');

                $user = (new User())
                    ->setEmail($payload->email)
                    ->setFirstName($signInResult->data()['displayName'])
                    ->setLastName('')
                    ->setFirebaseUid($firebaseUid)
                ;
                $this->em->persist($user);
                $this->em->flush();
            }

            // $idToken = $auth->createCustomToken($signInResult->firebaseUserId(), $user->getRoles());
            $token = $jwtManager->create($user);


        } catch (FailedToSignIn $e){
            $this->logger->error($e->getMessage(), ['exception' => $e]);
            return new JsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage(), ['exception' => $e]);
            return new JsonResponse(['success' => false], 400);
        }
        return $this->getLoginSuccessResponse($token, $user);
    }


    /**
     * @Route("/api/signup", name="api_signup", methods={"POST"})
     */
    public function signUp(
        Auth $auth,
        ValidatorInterface $validator,
        Request $request,
        EntityManagerInterface $em,
        TranslatorInterface $translator,
        JWTTokenManagerInterface $jwtManager

    ): JsonResponse
    {
        $payload = json_decode($request->getContent(), false);

        $email = $payload->email;
        $password = $payload->password;
        $firstName = $payload->firstName;
        $lastName = $payload->lastName;

        $user = $em->getRepository(User::class)->findOneBy(['email' => $email]);
        if($user && $user->getFirebaseUid()){
            return new JsonResponse(['error' => 'User already exists'], 400);
        }

        if(!$user){
            $user = (new User())
                ->addRole(User::ROLE_STUDENT)
            ;
        }

        /** @var User */
        $user->setEmail($email)
            ->setFirstName($firstName)
            ->setLastName($lastName)
        ;


        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()][] = $translator->trans($error->getMessage());
            }

            return new JsonResponse(['error' => $errorMessages], 400);
        }

        try {
            $userProperties = [
                'email' => $email,
                'password' => $password,
            ];

            $createdUser = $auth->createUser($userProperties);

            $user->setFirebaseUid($createdUser->uid);
            $em->persist($user);
            $em->flush();

            //$idToken = $auth->createCustomToken($createdUser->uid, $user->getRoles());
            $token = $jwtManager->create($user);

            return $this->getLoginSuccessResponse($token, $user);
        } catch (AuthException|FirebaseException $e){
            $this->logger->error($e->getMessage(), ['exception' => $e]);
            return new JsonResponse(['error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            $this->logger->error($e->getMessage(), ['exception' => $e]);
            return new JsonResponse(['success' => false], 400);
        }
    }

    private function getLoginSuccessResponse(string $token, User $user): JsonResponse
    {
        return new JsonResponse([
            'success' => true,
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => $user->getId(),
                    'firstName' => $user->getFirstName(),
                    'lastName' => $user->getLastName(),
                    'email' => $user->getEmail(),
                    'roles' => $user->getRoles(),
                ]
            ]
        ]);
    }

    /**
     * @Route("/api/verify_token", name="api_verify_token", methods={"GET"})
     */
    public function verifyToken(Request $request): JsonResponse
    {
        $idToken = $request->headers->get('Authorization');

        if (!$idToken) {
            return new JsonResponse(['error' => 'No token provided'], 401);
        }

        $verifier = new Verifier(env('FIREBASE_PROJECT_ID'));
        try {
            $verifiedIdToken = $verifier->verifyIdToken($idToken);
        } catch (InvalidToken $e) {
            return new JsonResponse(['error' => $e->getMessage()], 401);
        }

        $uid = $verifiedIdToken->getClaim('sub');

        return new JsonResponse(['uid' => $uid]);
    }
}

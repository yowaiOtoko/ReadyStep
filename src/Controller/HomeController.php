<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Session;
use App\Form\SessionType;

#[Route('/', name: 'home_')]
class HomeController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(Request $request, ManagerRegistry $doctrine)
    {
        $entityManager = $doctrine->getManager();
        $sessions = $doctrine->getRepository(Session::class)->findAll();

        $session = new Session;

        $form = $this->createForm(SessionType::class, $session);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $session = $form->getData();

            $entityManager->persist($session);
            $entityManager->flush();

            return $this->redirectToRoute('session_show', [
                'name' => $session->getName()
            ]);
        }

        return $this->render('home/index.html.twig', [
            'form' => $form,
            'sessions' => $sessions
        ]);
    }
}

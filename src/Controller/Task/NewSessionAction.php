<?php

namespace App\Controller\Task;

use App\Entity\Task\Session;
use App\Entity\Task\Activity;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;

#[AsController]
#[Route('api/app/activity/{activityId}/new-session', name: 'app_activity_new_session', methods: ['POST'])]
class NewSessionAction extends AbstractController
{

    public function __invoke(
        NormalizerInterface $serializer,
        EntityManagerInterface $em,
        int $activityId,
    ): JsonResponse
    {
        /** @var Activity */
        $activity = $em->getRepository(Activity::class)->find($activityId);
        if(!$activity){
            throw new BadRequestException('Activity not found');
        }

        $data =  $serializer->normalize($activity, 'json');

        $session = (new Session)
            ->setName($activity->getName())
            ->setState($data)
            ->setCreatedAt(new \DateTimeImmutable())
            ->setIsPaused(false)
            ->setDescription($activity->getDescription())
            ->setActivity($activity)
        ;

        $em->persist($session);
        $em->flush();


        return new JsonResponse($session);
    }
}
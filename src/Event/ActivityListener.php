<?php

namespace App\Event;

use Doctrine\ORM\Events;
use App\Entity\Task\Session;
use App\Entity\Task\Activity;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\Persistence\ObjectManager;

#[AsEntityListener(event: Events::preUpdate, method: 'preUpdate', entity: Activity::class)]
class ActivityListener {

    public function preUpdate(Activity $activity, PreUpdateEventArgs $args){

        $em = $args->getObjectManager();
        $this->updateUserTasks($em, $activity);

    }

    private function updateUserTasks(EntityManagerInterface $em, Activity $activity){
        $sessions = $activity->getSessions()->filter(fn(Session $s) => $s->getEndedAt() == null);
        $activityTasksId = $activity->getTasks()->map(fn(Task $t) => $t->getId());


        /** @var Session $session */
        foreach($sessions as $session){
            foreach($session->getUsers() as $user){
                $userTasks = $em->getRepository(UserTask::class)->findBy([
                    'session' => $session->getId(),
                    'user' => $user->getId()
                ]);

                $userTasksId = array_map(fn(UserTask $ut) => $ut->getTask()->getId(), $userTasks);
                $newTasks = array_diff($activityTasksId, $userTasksId);

                foreach($newTasks as $newTask){
                    $userTask = new UserTask;
                    $userTask->setUser($user);
                    $userTask->setTask($em->getReference(Task::class, $newTask));
                    $userTask->setSession($session);
                    $em->persist($userTask);
                }

                $removedTasks = array_diff($userTasksId, $activityTasksId);
                foreach($removedTasks as $removedTask){
                    $em->remove($em->getReference(Task::class, $removedTask));
                }
            }
        }
    }

}
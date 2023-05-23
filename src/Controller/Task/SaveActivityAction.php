<?php


namespace App\Controller\Task;

use App\Entity\Task\Task;
use App\Utils\SectionType;
use App\Entity\Task\Activity;
use App\Entity\Task\TaskGroup;
use App\Repository\Task\ActivityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[AsController]
#[Route('/api/task-lists/{id}/save', methods: ['POST'])]
class SaveActivityAction extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $em, ActivityRepository $activityRepos)
    {
        $data = json_decode($request->getContent(), true);

        $activity = $activityRepos->find($request->get('id'));
        $activity->getTaskGroups()->clear();


        $this->handleData($data, $activity);

        dump($activity);

        $em->persist($activity);
        $em->flush();

        return new JsonResponse($activity);
    }

    private function handleData(array $data, Activity $activity): void
    {

        $taskGroup = null;
        foreach($data as $section){
            switch($section['type']){
                case SectionType::Title->value:
                    $taskGroup = $this->createTitle($section);
                    $activity->addTaskGroups($taskGroup);
                    break;
                case SectionType::Text->value:
                    $this->createText($section, $taskGroup);
                    break;
                case SectionType::Task->value:
                    $this->createTask($section, $taskGroup);
                    break;
            }
        }

    }

    private function createTask(array $data, TaskGroup &$taskGroup): void
    {
        $subTask = (new Task())
            ->setDescription($data['content'])
        ;

        $taskGroup->addTask($subTask);

    }

    private function createText(array $data, TaskGroup &$taskGroup): void
    {
        $subTask = (new Task())
            ->setDescription($data['content'])
        ;

        $taskGroup->addTask($subTask);

    }

    private function createTitle(array $data): TaskGroup
    {
        $task = (new TaskGroup())
            ->setLabel(trim($data['content']))
        ;
        return $task;
    }


}
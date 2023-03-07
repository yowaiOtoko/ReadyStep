<?php


namespace App\Controller\Task;

use App\Entity\Task;
use App\Utils\SectionType;
use App\Entity\Task\TaskList;
use App\Repository\Task\TaskListRepository;
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
    public function __invoke(Request $request, EntityManagerInterface $em, TaskListRepository $activityRepos)
    {
        $data = json_decode($request->getContent(), true);

        $activity = $activityRepos->find($request->get('id'));
        $activity->getTasks()->clear();


        $this->handleData($data, $activity);

        dump($activity);

        $em->persist($activity);
        $em->flush();

        return new JsonResponse($activity);
    }

    private function handleData(array $data, TaskList $activity): void
    {

        $task = null;
        foreach($data as $section){
            switch($section['type']){
                case SectionType::Title->value:
                    $task = $this->createTitle($section);
                    $activity->addTask($task);
                    break;
                case SectionType::Text->value:
                    $this->createText($section, $task);
                    break;
                case SectionType::Task->value:
                    $this->createTask($section, $task);
                    break;
            }
        }

    }

    private function createTask(array $data, Task &$task): void
    {
        $subTask = (new Task())
            ->setDescription($data['content'])
        ;

        $task->addTask($subTask);

    }

    private function createText(array $data, Task &$task): void
    {
        $task->setDescription($data['content']);

    }

    private function createTitle(array $data): Task
    {
        $task = (new Task())
            ->setLabel(trim($data['content']))
        ;
        return $task;
    }


}
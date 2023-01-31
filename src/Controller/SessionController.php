<?php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Session;
use App\Form\UserType;
use App\Entity\User;
use App\Form\TaskType;
use App\Entity\Task;
use App\Entity\UserTask;

#[Route('/session', name: 'session_')]
class SessionController extends AbstractController
{
    #[Route('/{sessionName}/dashboard', name: 'show')]
    public function show(string $sessionName, ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $session = $doctrine->getRepository(Session::class)->findOneBy([
            'name' => $sessionName
        ]);

        $users = $doctrine->getRepository(User::class)->findBy([
            'session' => $session->getId()
        ]);

        $user = new User;
        $form = $this->createForm(UserType::class, $user);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $user = $form->getData();
            $user->setSession($session);

            $entityManager->persist($user);
            $entityManager->flush();

            return $this->redirectToRoute('session_show', [
                'sessionName' => $session->getName()
            ]);
        }

        return $this->render('session/show.html.twig', [
            'session' => $session,
            'form' => $form,
            'users' => $users
        ]);
    }

    #[Route('/{sessionName}/{userName}', name: 'index')]
    public function index(ManagerRegistry $doctrine, Request $request, string $sessionName, string $userName): Response
    {
        $entityManager = $doctrine->getManager();

        $userTasks = $doctrine->getRepository(UserTask::class)->findAll();

        $user = $doctrine->getRepository(User::class)->findOneBy([
            'name' => $userName
        ]);

        $session = $doctrine->getRepository(Session::class)->findOneBy([
            'name' => $sessionName
        ]);

        $users = $doctrine->getRepository(User::class)->findBy([
            'session' => $session->getId()
        ]);

        $tasks = $doctrine->getRepository(Task::class)->findAll();

        $task = new Task;
        $taskForm = $this->createForm(TaskType::class, $task);

        $taskForm->handleRequest($request);
        if ($taskForm->isSubmitted() && $taskForm->isValid()) {
            $task = $taskForm->getData();
            $task->setSession($session);

            $entityManager->persist($task);
            $entityManager->flush();

            return $this->redirectToRoute('session_index', [
                'sessionName' => $session->getName(),
                'userName' => $user->getName()
            ]);
        }

dump($userTasks);

        return $this->render('session/index.html.twig', [
            'session' => $session,
            'user' => $user,
            'users' => $users,
            'taskForm' => $taskForm,
            'tasks' => $tasks,
            'userTasks' => $userTasks
        ]);
    }
}

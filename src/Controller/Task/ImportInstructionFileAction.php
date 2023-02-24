<?php


namespace App\Controller\Task;


use Symfony\Component\Process\Process;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\Task\TaskListRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
#[Route('/api/task-lists/{id}/import', methods: ['POST'])]
final class ImportInstructionFileAction extends AbstractController
{
    public function __invoke(Request $request, $id, TaskListRepository $repository, EntityManagerInterface $em): JsonResponse
    {
        /** @var UploadedFile */
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $tempFilePath =  uniqid($uploadedFile->getClientOriginalName());
        $uploadedFile->move(sys_get_temp_dir(), $tempFilePath);

        $contentPath = $this->pdfToHtml(sys_get_temp_dir().'/'.$tempFilePath);

        //$content = preg_replace('/(.*\n)/', '$1', file_get_contents($contentPath));
        $content =  file_get_contents($contentPath);

        //throw new \Exception($content);
        $activity = $repository->find($id);
        if(!$activity) {
            throw new NotFoundHttpException('Activity not found');
        }

        $activity->setInstructionText($content);

        $em->persist($activity);
        $em->flush();

        return new JsonResponse();

    }


    public function pdfToHtml($inputFile): string
    {
        $tempFilePath =  tempnam(sys_get_temp_dir(), 'ready_step_to_html');


        $process = new Process([
            'command' => '/usr/bin/pdftotext',
            '-layout',
            $inputFile,
            $tempFilePath,

        ]);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return  $tempFilePath;
    }
}

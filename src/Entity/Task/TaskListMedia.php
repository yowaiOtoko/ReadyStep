<?php

namespace App\Entity\Task;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\AbstractMediaObject;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\Task\TaskListRepository;
use App\Controller\Task\CreateMediaObjectAction;

#[ORM\Entity]
#[ApiResource()]
class TaskListMedia extends AbstractMediaObject
{
    #[ORM\ManyToOne(inversedBy: 'files')]
    private ?TaskList $taskList = null;

    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'instructionFile')]
    private ?TaskList $activity = null;

    public function __construct()
    {
        //parent::__construct();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTaskList(): ?TaskList
    {
        return $this->taskList;
    }

    public function setTaskList(?TaskList $taskList): self
    {
        $this->taskList = $taskList;

        return $this;
    }

    public function getActivity(): ?TaskList
    {
        return $this->activity;
    }

    public function setActivity(?TaskList $activity): self
    {
        $this->activity = $activity;

        return $this;
    }
}
<?php

namespace App\Entity\Task;

use Gedmo\Timestampable;
use App\Entity\Task\Session;
use App\Entity\Task\Activity;
use App\Entity\Task\UserTask;
use Doctrine\DBAL\Types\Types;
use App\Entity\Task\SessionTask;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Timestampable\Traits\TimestampableEntity;

#[ORM\Entity]
#[ORM\Table(name: 'task_task')]
#[ApiResource()]
class Task
{
    use TimestampableEntity;
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: 'description', type: 'text', nullable: true)]
    private ?string $description = null;

    #[ORM\OneToMany(targetEntity: UserTask::class, mappedBy: 'task')]
    private Collection $userTasks;

    #[ORM\ManyToOne(inversedBy: 'tasks')]
    private ?Activity $activity = null;

    #[ORM\OneToMany(mappedBy: 'task', targetEntity: SessionTask::class, orphanRemoval: true)]
    private Collection $sessionTasks;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $label = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'tasks')]
    private ?self $parentTask = null;

    #[ORM\OneToMany(mappedBy: 'parentTask', targetEntity: self::class, cascade: ['persist', 'remove'])]
    #[ApiProperty(readableLink: true)]
    private Collection $tasks;

    #[ORM\OneToMany(mappedBy: 'task', targetEntity: SessionUserTask::class, orphanRemoval: true)]
    private Collection $sessionUserTasks;

    public function __construct()
    {
        $this->userTasks = new ArrayCollection;
        $this->sessionTasks = new ArrayCollection();
        $this->tasks = new ArrayCollection();
        $this->sessionUserTasks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getActivity(): ?Activity
    {
        return $this->activity;
    }

    public function setActivity(?Activity $activity): self
    {
        $this->activity = $activity;

        return $this;
    }

    /**
     * @return Collection<int, SessionTask>
     */
    public function getSessionTasks(): Collection
    {
        return $this->sessionTasks;
    }

    public function addSessionTask(SessionTask $sessionTask): self
    {
        if (!$this->sessionTasks->contains($sessionTask)) {
            $this->sessionTasks->add($sessionTask);
            $sessionTask->setTask($this);
        }

        return $this;
    }

    public function removeSessionTask(SessionTask $sessionTask): self
    {
        if ($this->sessionTasks->removeElement($sessionTask)) {
            // set the owning side to null (unless already changed)
            if ($sessionTask->getTask() === $this) {
                $sessionTask->setTask(null);
            }
        }

        return $this;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getParentTask(): ?self
    {
        return $this->parentTask;
    }

    public function setParentTask(?self $parentTask): self
    {
        $this->parentTask = $parentTask;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(self $task): self
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks->add($task);
            $task->setParentTask($this);
        }

        return $this;
    }

    public function removeTask(self $task): self
    {
        if ($this->tasks->removeElement($task)) {
            // set the owning side to null (unless already changed)
            if ($task->getParentTask() === $this) {
                $task->setParentTask(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, SessionUserTask>
     */
    public function getSessionUserTasks(): Collection
    {
        return $this->sessionUserTasks;
    }

    public function addSessionUserTask(SessionUserTask $sessionUserTask): self
    {
        if (!$this->sessionUserTasks->contains($sessionUserTask)) {
            $this->sessionUserTasks->add($sessionUserTask);
            $sessionUserTask->setTask($this);
        }

        return $this;
    }

    public function removeSessionUserTask(SessionUserTask $sessionUserTask): self
    {
        if ($this->sessionUserTasks->removeElement($sessionUserTask)) {
            // set the owning side to null (unless already changed)
            if ($sessionUserTask->getTask() === $this) {
                $sessionUserTask->setTask(null);
            }
        }

        return $this;
    }
}

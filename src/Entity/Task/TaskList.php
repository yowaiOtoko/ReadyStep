<?php

namespace App\Entity\Task;

use App\Entity\Task;
use App\Entity\User;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\Task\TaskListRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity(repositoryClass: TaskListRepository::class)]
#[ApiResource]
class TaskList
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;


    #[ORM\OneToMany(mappedBy: 'taskList', targetEntity: Task::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[ApiProperty(readableLink: true)]
    private Collection $tasks;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'taskLists')]
    #[ORM\JoinColumn(nullable: true)]
    private ?User $createdBy = null;

    #[ORM\OneToMany(mappedBy: 'taskList', targetEntity: TaskListMedia::class)]
    private Collection $files;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?TaskListMedia $instructionFile = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $instructionText = null;

    public function __construct()
    {
        $this->tasks = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->files = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }


    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): self
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks->add($task);
            $task->setTaskList($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            // set the owning side to null (unless already changed)
            if ($task->getTaskList() === $this) {
                $task->setTaskList(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): self
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    /**
     * @return Collection<int, TaskListMedia>
     */
    public function getFiles(): Collection
    {
        return $this->files;
    }

    public function addFile(TaskListMedia $file): self
    {
        if (!$this->files->contains($file)) {
            $this->files->add($file);
            $file->setTaskList($this);
        }

        return $this;
    }

    public function removeFile(TaskListMedia $file): self
    {
        if ($this->files->removeElement($file)) {
            // set the owning side to null (unless already changed)
            if ($file->getTaskList() === $this) {
                $file->setTaskList(null);
            }
        }

        return $this;
    }

    public function getInstructionFile(): ?TaskListMedia
    {
        return $this->instructionFile;
    }

    public function setInstructionFile(?TaskListMedia $instructionFile): self
    {
        $this->instructionFile = $instructionFile;

        return $this;
    }

    public function getInstructionText(): ?string
    {
        return $this->instructionText;
    }

    public function setInstructionText(?string $instructionText): self
    {
        $this->instructionText = $instructionText;

        return $this;
    }
}

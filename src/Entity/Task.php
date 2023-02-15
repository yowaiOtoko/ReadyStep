<?php
namespace App\Entity;

use App\Entity\Task\SessionTask;
use App\Entity\Task\TaskList;
use Doctrine\ORM\Mapping AS ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'app_task')]
class Task
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: 'description', type: 'text', nullable: false)]
    private ?string $description = null;

    #[ORM\Column(name: 'created_at', type: 'datetime_immutable', nullable: false)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(targetEntity: Session::class, inversedBy: 'tasks')]
    #[ORM\JoinColumn(name: 'session_id', referencedColumnName: 'id')]
    private ?Session $session = null;

    #[ORM\OneToMany(targetEntity: UserTask::class, mappedBy: 'task')]
    private Collection $userTasks;

    #[ORM\ManyToOne(inversedBy: 'tasks')]
    private ?TaskList $taskList = null;

    #[ORM\OneToMany(mappedBy: 'task', targetEntity: SessionTask::class, orphanRemoval: true)]
    private Collection $sessionTasks;

    public function __construct()
    {
        $this->userTasks = new ArrayCollection;
        $this->sessionTasks = new ArrayCollection();
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getSession(): ?Session
    {
        return $this->session;
    }

    public function setSession(Session $session): self
    {
        $this->session = $session;

        return $this;
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
}

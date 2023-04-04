<?php
namespace App\Entity\Task;

use ApiPlatform\Metadata\ApiProperty;
use App\Entity\User;
use App\Entity\Task\Task;
use ApiPlatform\Metadata\Get;
use App\Entity\Task\UserTask;
use Doctrine\DBAL\Types\Types;
use App\Entity\Task\SessionTask;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: 'task_session')]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ],
    paginationEnabled: false,
)]
class Session
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: 'name', length: 255, nullable: false, type: 'string', unique: true)]
    private ?string $name = null;

    #[ORM\OneToMany(targetEntity: User::class, mappedBy: 'session')]
    private Collection $users;

    #[ORM\OneToMany(targetEntity: SessionTask::class, mappedBy: 'session')]
    private Collection $sessionTasks;

    #[ORM\OneToMany(mappedBy: 'session', targetEntity: UserTask::class)]
    private Collection $userTasks;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description = null;

    #[ORM\Column(options: ["default" => 'CURRENT_TIMESTAMP'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    private array $state = [];

    #[ORM\Column]
    private bool $isPaused = false;

    #[ORM\Column]
    private bool $isLocked = false;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $startedAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $endedAt = null;

    #[ORM\OneToMany(mappedBy: 'session', targetEntity: SessionUserTask::class, orphanRemoval: true)]
    private Collection $sessionUserTasks;

    #[ORM\ManyToOne(inversedBy: 'sessions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Activity $activity = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->sessionTasks = new ArrayCollection();
        $this->userTasks = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->sessionUserTasks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getUsers(): Collection
    {
        return $this->users;
    }

    #[ApiProperty()]
    public function getAuthor(): string
    {
        return $this->activity->getCreatedBy();
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setSession($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->removeElement($user)) {
            if ($user->getSession() === $this) {
                $user->setSession(null);
            }
        }

        return $this;
    }

    public function getSessionTasks(): Collection
    {
        return $this->sessionTasks;
    }

    public function addSessionTask(SessionTask $sessionTask): self
    {
        if (!$this->sessionTasks->contains($sessionTask)) {
            $this->sessionTasks->add($sessionTask);
            $sessionTask->setSession($this);
        }

        return $this;
    }

    public function removeSessionTask(Task $sessionTask): self
    {
        if ($this->sessionTasks->removeElement($sessionTask)) {
            if ($sessionTask->getSession() === $this) {
                $sessionTask->setSession(null);
            }
        }

        return $this;
    }

    public function getUserTasks(): Collection
    {
        return $this->userTasks;
    }

    public function addUserTask(UserTask $userTask): self
    {
        if (!$this->userTasks->contains($userTask)) {
            $this->userTasks->add($userTask);
            $userTask->setSession($this);
        }

        return $this;
    }

    public function removeUserTask(UserTask $userTask): self
    {
        if ($this->userTasks->removeElement($userTask)) {
            if ($userTask->getSession() === $this) {
                $userTask->setSession(null);
            }
        }

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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getState(): array
    {
        return $this->state;
    }

    public function setState(?array $state): self
    {
        $this->state = $state;

        return $this;
    }

    public function isIsPaused(): bool
    {
        return $this->isPaused;
    }

    public function setIsPaused(bool $isPaused): self
    {
        $this->isPaused = $isPaused;

        return $this;
    }

    public function isIsLocked(): bool
    {
        return $this->isLocked;
    }

    public function setIsLocked(bool $isLocked): self
    {
        $this->isLocked = $isLocked;

        return $this;
    }

    public function getStartedAt(): ?\DateTimeImmutable
    {
        return $this->startedAt;
    }

    public function setStartedAt(?\DateTimeImmutable $startedAt): self
    {
        $this->startedAt = $startedAt;

        return $this;
    }

    public function getEndedAt(): ?\DateTimeImmutable
    {
        return $this->endedAt;
    }

    public function setEndedAt(?\DateTimeImmutable $endedAt): self
    {
        $this->endedAt = $endedAt;

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
            $sessionUserTask->setSession($this);
        }

        return $this;
    }

    public function removeSessionUserTask(SessionUserTask $sessionUserTask): self
    {
        if ($this->sessionUserTasks->removeElement($sessionUserTask)) {
            // set the owning side to null (unless already changed)
            if ($sessionUserTask->getSession() === $this) {
                $sessionUserTask->setSession(null);
            }
        }

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
}

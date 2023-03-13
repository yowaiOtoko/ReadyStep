<?php
namespace App\Entity\Task;

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

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->sessionTasks = new ArrayCollection();
        $this->userTasks = new ArrayCollection();
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
}

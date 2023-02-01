<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity]
#[ORM\Table(name: 'app_session')]
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

    #[ORM\OneToMany(targetEntity: Task::class, mappedBy: 'session')]
    private Collection $tasks;

    #[ORM\OneToMany(mappedBy: 'session', targetEntity: UserTask::class)]
    private Collection $userTasks;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->tasks = new ArrayCollection();
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

    public function getTasks(): Collection
    {
        return $this->tasks;
    }

    public function addTask(Task $task): self
    {
        if (!$this->tasks->contains($task)) {
            $this->tasks->add($task);
            $task->setSession($this);
        }

        return $this;
    }

    public function removeTask(Task $task): self
    {
        if ($this->tasks->removeElement($task)) {
            if ($task->getSession() === $this) {
                $task->setSession(null);
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
}

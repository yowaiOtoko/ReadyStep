<?php
namespace App\Entity;

use App\Entity\Task\Session;
use ApiPlatform\Metadata\Get;
use App\Entity\Task\Activity;
use App\Entity\Task\SessionUserTask;
use App\Entity\Task\UserTask;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

#[ORM\Entity]
#[ORM\Table(name: 'app_user')]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ],
    paginationEnabled: false,
)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(name: 'name', type: 'string', length: 255, nullable: false, unique: true)]
    private ?string $name;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\ManyToOne(targetEntity: Session::class, inversedBy: 'users')]
    #[ORM\JoinColumn(name: 'session_id', referencedColumnName: 'id')]
    private ?Session $session = null;

    #[ORM\OneToMany(targetEntity: UserTask::class, mappedBy: 'user')]
    private Collection $userTasks;

    #[ORM\OneToMany(mappedBy: 'createdBy', targetEntity: Activity::class, orphanRemoval: true)]
    private Collection $activities;

    #[ORM\OneToMany(mappedBy: 'userr', targetEntity: SessionUserTask::class, orphanRemoval: true)]
    private Collection $sessionUserTasks;

    public function __construct()
    {
        $this->userTasks = new ArrayCollection;
        $this->activities = new ArrayCollection();
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

    public function getSession(): ?Session
    {
        return $this->session;
    }

    public function setSession(Session $session)
    {
        $this->session = $session;

        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;

        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return Collection<int, Activity>
     */
    public function getActivities(): Collection
    {
        return $this->activities;
    }

    public function addActivity(Activity $activity): self
    {
        if (!$this->activities->contains($activity)) {
            $this->activities->add($activity);
            $activity->setCreatedBy($this);
        }

        return $this;
    }

    public function removeActivity(Activity $activity): self
    {
        if ($this->activities->removeElement($activity)) {
            // set the owning side to null (unless already changed)
            if ($activity->getCreatedBy() === $this) {
                $activity->setCreatedBy(null);
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
            $sessionUserTask->setUserr($this);
        }

        return $this;
    }

    public function removeSessionUserTask(SessionUserTask $sessionUserTask): self
    {
        if ($this->sessionUserTasks->removeElement($sessionUserTask)) {
            // set the owning side to null (unless already changed)
            if ($sessionUserTask->getUserr() === $this) {
                $sessionUserTask->setUserr(null);
            }
        }

        return $this;
    }
}

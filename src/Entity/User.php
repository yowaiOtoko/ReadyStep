<?php
namespace App\Entity;

use App\Entity\Task\Session;
use ApiPlatform\Metadata\Get;
use App\Entity\Task\Activity;
use App\Entity\Task\UserTask;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Task\SessionUserTask;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use phpDocumentor\Reflection\Types\Nullable;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity]
#[UniqueEntity('email')]
#[ORM\Table(name: 'app_user')]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Patch()
    ],
    paginationEnabled: false,
)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'IDENTITY')]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank(message: 'user.first_name.not_blank')]
    #[Assert\Length(max: 50, maxMessage: 'user.first_name.max_length')]
    #[ORM\Column(length: 255)]
    private ?string $firstName;

    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\ManyToOne(targetEntity: Session::class, inversedBy: 'users')]
    #[ORM\JoinColumn(name: 'session_id', referencedColumnName: 'id')]
    private ?Session $session = null;

    #[ORM\OneToMany(targetEntity: UserTask::class, mappedBy: 'user')]
    private Collection $userTasks;

    #[ORM\OneToMany(mappedBy: 'createdBy', targetEntity: Activity::class, orphanRemoval: true)]
    private Collection $activities;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: SessionUserTask::class, orphanRemoval: true)]
    private Collection $sessionUserTasks;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $firebaseuid = null;

    #[Assert\NotBlank(message: 'user.email.not_blank')]
    #[Assert\Email(message: 'user.email.invalid')]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[Assert\NotBlank(message: 'user.last_name.not_blank')]
    #[Assert\Length(max: 50, maxMessage: 'user.last_name.max_length')]
    #[ORM\Column(length: 255)]
    private ?string $lastName = null;

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

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

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

    public function getFirebaseUid(): ?string
    {
        return $this->firebaseuid;
    }

    public function setFirebaseUid(string $firebaseuid): self
    {
        $this->firebaseuid = $firebaseuid;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }
}

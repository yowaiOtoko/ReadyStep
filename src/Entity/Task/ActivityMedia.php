<?php

namespace App\Entity\Task;

use ApiPlatform\Metadata\Get;
use App\Entity\Task\Activity;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\AbstractMediaObject;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\Task\ActivityRepository;
use App\Controller\Task\CreateMediaObjectAction;

#[ORM\Entity]
#[ORM\Table(name: 'task_activity_media')]
#[ApiResource()]
class ActivityMedia extends AbstractMediaObject
{


    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'instructionFile')]
    private ?Activity $activity = null;

    public function __construct()
    {
        //parent::__construct();
    }

    public function getId(): ?int
    {
        return $this->id;
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
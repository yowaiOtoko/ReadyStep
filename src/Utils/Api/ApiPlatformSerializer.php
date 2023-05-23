<?php

namespace App\Utils\Api;

class ApiPlatformSerializer
{
    public function __construct(private $serializer)
    {}

    public function serialize($data, string $format = 'json', array $context = [])
    {
        return $this->serializer->serialize($data, $format, $context);
    }
}
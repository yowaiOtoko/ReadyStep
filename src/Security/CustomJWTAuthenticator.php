<?php

namespace App\Security;

use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\AuthorizationHeaderTokenExtractor;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\TokenExtractorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authenticator\JWTAuthenticator;
use Lexik\Bundle\JWTAuthenticationBundle\TokenExtractor\QueryParameterTokenExtractor;

class CustomJWTAuthenticator extends JWTAuthenticator
{
    protected function getTokenExtractor(): TokenExtractorInterface
    {
        // Or retrieve the chain token extractor for mapping/unmapping extractors for this authenticator
        $chainExtractor = parent::getTokenExtractor();

        // Add a new query parameter extractor to the configured ones
        $chainExtractor->addExtractor(new QueryParameterTokenExtractor('bearer'));

        // Return the chain token extractor with the new map
        return $chainExtractor;
    }
}
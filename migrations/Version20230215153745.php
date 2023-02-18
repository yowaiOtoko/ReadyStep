<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230215153745 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE task_list ADD instruction_file_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE task_list ADD CONSTRAINT FK_377B6C63E44E2E3E FOREIGN KEY (instruction_file_id) REFERENCES task_list_media (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_377B6C63E44E2E3E ON task_list (instruction_file_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE task_list DROP CONSTRAINT FK_377B6C63E44E2E3E');
        $this->addSql('DROP INDEX UNIQ_377B6C63E44E2E3E');
        $this->addSql('ALTER TABLE task_list DROP instruction_file_id');
    }
}

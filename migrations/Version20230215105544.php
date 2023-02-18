<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230215105544 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE abstract_media_object_id_seq CASCADE');
        $this->addSql('DROP TABLE abstract_media_object');
        $this->addSql('ALTER TABLE task_list_media ADD activity_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE task_list_media ADD CONSTRAINT FK_AFAC7EA081C06096 FOREIGN KEY (activity_id) REFERENCES task_list (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_AFAC7EA081C06096 ON task_list_media (activity_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE abstract_media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE abstract_media_object (id INT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE task_list_media DROP CONSTRAINT FK_AFAC7EA081C06096');
        $this->addSql('DROP INDEX IDX_AFAC7EA081C06096');
        $this->addSql('ALTER TABLE task_list_media DROP activity_id');
    }
}

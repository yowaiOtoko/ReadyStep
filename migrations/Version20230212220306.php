<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230212220306 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE session_task_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE session_task (id INT NOT NULL, session_id INT DEFAULT NULL, task_id INT NOT NULL, started_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, ended_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, duration VARCHAR(255) DEFAULT NULL, is_active BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_940FDB0F613FECDF ON session_task (session_id)');
        $this->addSql('CREATE INDEX IDX_940FDB0F8DB60186 ON session_task (task_id)');
        $this->addSql('COMMENT ON COLUMN session_task.started_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN session_task.ended_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN session_task.duration IS \'(DC2Type:dateinterval)\'');
        $this->addSql('ALTER TABLE session_task ADD CONSTRAINT FK_940FDB0F613FECDF FOREIGN KEY (session_id) REFERENCES app_session (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE session_task ADD CONSTRAINT FK_940FDB0F8DB60186 FOREIGN KEY (task_id) REFERENCES app_task (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE task_list ALTER created_by_id DROP NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE session_task_id_seq CASCADE');
        $this->addSql('ALTER TABLE session_task DROP CONSTRAINT FK_940FDB0F613FECDF');
        $this->addSql('ALTER TABLE session_task DROP CONSTRAINT FK_940FDB0F8DB60186');
        $this->addSql('DROP TABLE session_task');
        $this->addSql('ALTER TABLE task_list ALTER created_by_id SET NOT NULL');
    }
}

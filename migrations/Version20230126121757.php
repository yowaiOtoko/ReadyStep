<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230126121757 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE app_user_task ADD user_id INT DEFAULT NULL, ADD task_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE app_user_task ADD CONSTRAINT FK_8090C8D9A76ED395 FOREIGN KEY (user_id) REFERENCES app_user (id)');
        $this->addSql('ALTER TABLE app_user_task ADD CONSTRAINT FK_8090C8D98DB60186 FOREIGN KEY (task_id) REFERENCES app_task (id)');
        $this->addSql('CREATE INDEX IDX_8090C8D9A76ED395 ON app_user_task (user_id)');
        $this->addSql('CREATE INDEX IDX_8090C8D98DB60186 ON app_user_task (task_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE app_user_task DROP FOREIGN KEY FK_8090C8D9A76ED395');
        $this->addSql('ALTER TABLE app_user_task DROP FOREIGN KEY FK_8090C8D98DB60186');
        $this->addSql('DROP INDEX IDX_8090C8D9A76ED395 ON app_user_task');
        $this->addSql('DROP INDEX IDX_8090C8D98DB60186 ON app_user_task');
        $this->addSql('ALTER TABLE app_user_task DROP user_id, DROP task_id');
    }
}

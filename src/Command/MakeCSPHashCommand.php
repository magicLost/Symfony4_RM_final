<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class MakeCSPHashCommand extends Command
{

    protected static $defaultName = 'mine:csp-hash';
    protected $mainPath = __DIR__.'/../../';

    protected function configure()
    {
        $this->mainPath = realpath($this->mainPath);
        $this->addArgument('fileName', InputArgument::REQUIRED, 'File to hash');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln("Not bad...");
        $output->writeln("You entered: ".$input->getArgument('fileName'));
        $output->writeln("Path: ".$this->mainPath);
    }

}
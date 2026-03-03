<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Experience;
use App\Models\Profile;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('12345678'),
            ]
        );

        // ─── Profile ─────────────────────────────────────────────────────────
        Profile::firstOrCreate(
            ['email' => 'sagi@example.com'],
            [
                'full_name'    => 'Sagi Developer',
                'title'        => 'Full-Stack Web Developer',
                'about'        => 'Passionate full-stack developer with 7+ years of experience building modern web applications. I love clean code, scalable architecture and turning ideas into polished products.',
                'email'        => 'sagi@example.com',
                'phone'        => '+1 (555) 123-4567',
                'location'     => 'New York, USA',
                'github_url'   => 'https://github.com/yourusername',
                'linkedin_url' => 'https://linkedin.com/in/yourusername',
                'cv_url'       => null,
            ]
        );

        $this->command->info('Seeded profile successfully.');

        $skills = [
            ['name' => 'PHP',        'icon' => 'fa-php',       'level' => 90, 'description' => 'Server-side scripting language.',         'sort_order' => 1],
            ['name' => 'Laravel',    'icon' => 'fa-laravel',   'level' => 88, 'description' => 'PHP web application framework.',           'sort_order' => 2],
            ['name' => 'JavaScript', 'icon' => 'fa-js',        'level' => 85, 'description' => 'Dynamic programming language for the web.','sort_order' => 3],
            ['name' => 'React',      'icon' => 'fa-react',     'level' => 82, 'description' => 'JavaScript library for building UIs.',     'sort_order' => 4],
            ['name' => 'Vue.js',     'icon' => 'fa-vuejs',     'level' => 75, 'description' => 'Progressive JavaScript framework.',        'sort_order' => 5],
            ['name' => 'MySQL',      'icon' => 'fa-database',  'level' => 85, 'description' => 'Relational database management system.',   'sort_order' => 6],
            ['name' => 'HTML & CSS', 'icon' => 'fa-html5',     'level' => 92, 'description' => 'Markup and styling of web pages.',         'sort_order' => 7],
            ['name' => 'Tailwind CSS','icon' => 'fa-css3',     'level' => 80, 'description' => 'Utility-first CSS framework.',             'sort_order' => 8],
            ['name' => 'Git',        'icon' => 'fa-git',       'level' => 85, 'description' => 'Version control system.',                  'sort_order' => 9],
            ['name' => 'Docker',     'icon' => 'fa-docker',    'level' => 65, 'description' => 'Containerisation platform.',               'sort_order' => 10],
        ];

        foreach ($skills as $skill) {
            Skill::firstOrCreate(['name' => $skill['name']], $skill);
        }

        $this->command->info('Seeded 10 skills successfully.');

        // ─── Projects ────────────────────────────────────────────────────────
        $projects = [
            [
                'title'       => 'Portfolio API',
                'description' => 'A RESTful API built with Laravel to power a personal portfolio website, featuring authentication, profile, skills, projects and experiences management.',
                'tech_stack'  => 'Laravel, MySQL, Sanctum',
                'demo_url'    => null,
                'github_url'  => 'https://github.com/yourusername/portfolio-api',
                'image_url'   => null,
                'sort_order'  => 1,
            ],
            [
                'title'       => 'Portfolio Frontend',
                'description' => 'A modern React SPA that consumes the Portfolio API, showcasing skills, projects and work experience in a clean UI.',
                'tech_stack'  => 'React, Vite, Axios, React Router',
                'demo_url'    => 'https://yourdomain.com',
                'github_url'  => 'https://github.com/yourusername/portfolio-frontend',
                'image_url'   => null,
                'sort_order'  => 2,
            ],
            [
                'title'       => 'E-Commerce Platform',
                'description' => 'A full-stack e-commerce application with product listings, cart, checkout and order management.',
                'tech_stack'  => 'Laravel, Vue.js, Tailwind CSS, MySQL',
                'demo_url'    => null,
                'github_url'  => 'https://github.com/yourusername/ecommerce',
                'image_url'   => null,
                'sort_order'  => 3,
            ],
            [
                'title'       => 'Task Management App',
                'description' => 'A Kanban-style task manager with drag-and-drop boards, user assignment and deadline tracking.',
                'tech_stack'  => 'React, Laravel, MySQL',
                'demo_url'    => null,
                'github_url'  => 'https://github.com/yourusername/task-manager',
                'image_url'   => null,
                'sort_order'  => 4,
            ],
            [
                'title'       => 'Real-Time Chat App',
                'description' => 'A real-time messaging application using WebSockets with rooms and private messaging support.',
                'tech_stack'  => 'Laravel, Pusher, React, Tailwind CSS',
                'demo_url'    => null,
                'github_url'  => 'https://github.com/yourusername/chat-app',
                'image_url'   => null,
                'sort_order'  => 5,
            ],
            [
                'title'       => 'Blog CMS',
                'description' => 'A content management system for blogging with markdown support, tags, categories and SEO-friendly URLs.',
                'tech_stack'  => 'Laravel, MySQL, Alpine.js, Tailwind CSS',
                'demo_url'    => null,
                'github_url'  => 'https://github.com/yourusername/blog-cms',
                'image_url'   => null,
                'sort_order'  => 6,
            ],
        ];

        foreach ($projects as $project) {
            Project::firstOrCreate(['title' => $project['title']], $project);
        }

        $this->command->info('Seeded 6 projects successfully.');

        // ─── Experiences ─────────────────────────────────────────────────────
        $experiences = [
            [
                'company'    => 'Tech Solutions Ltd.',
                'role'       => 'Senior Full-Stack Developer',
                'location'   => 'Remote',
                'start_date' => 'Jan 2024',
                'end_date'   => 'Present',
                'details'    => 'Leading development of a SaaS platform using Laravel and React. Architected microservices, mentored junior developers and improved API response times by 40%.',
                'sort_order' => 1,
            ],
            [
                'company'    => 'Digital Agency Co.',
                'role'       => 'Full-Stack Developer',
                'location'   => 'New York, USA',
                'start_date' => 'Mar 2022',
                'end_date'   => 'Dec 2023',
                'details'    => 'Built and maintained client web applications using Laravel and Vue.js. Delivered 12+ projects on time, integrated third-party APIs and introduced automated testing.',
                'sort_order' => 2,
            ],
            [
                'company'    => 'StartUp Hub',
                'role'       => 'Backend Developer',
                'location'   => 'London, UK',
                'start_date' => 'Jun 2020',
                'end_date'   => 'Feb 2022',
                'details'    => 'Developed REST APIs and internal tools using Laravel. Managed MySQL databases and deployed applications on AWS EC2 with Docker.',
                'sort_order' => 3,
            ],
            [
                'company'    => 'Freelance',
                'role'       => 'Web Developer',
                'location'   => 'Remote',
                'start_date' => 'Jan 2019',
                'end_date'   => 'May 2020',
                'details'    => 'Delivered full-stack web solutions for small businesses including e-commerce stores, landing pages and custom CMS implementations.',
                'sort_order' => 4,
            ],
            [
                'company'    => 'Creative Studio',
                'role'       => 'Junior Frontend Developer',
                'location'   => 'Toronto, Canada',
                'start_date' => 'Jul 2017',
                'end_date'   => 'Dec 2018',
                'details'    => 'Developed responsive UIs using HTML, CSS and JavaScript. Collaborated with designers to implement pixel-perfect layouts and improved page load performance.',
                'sort_order' => 5,
            ],
            [
                'company'    => 'University IT Department',
                'role'       => 'IT Intern',
                'location'   => 'On-site',
                'start_date' => 'Sep 2016',
                'end_date'   => 'Jun 2017',
                'details'    => 'Assisted in maintaining the university portal, fixing bugs in the PHP backend and supporting staff with technical issues.',
                'sort_order' => 6,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::firstOrCreate(
                ['company' => $experience['company'], 'role' => $experience['role']],
                $experience
            );
        }

        $this->command->info('Seeded 6 experiences successfully.');
    }
}

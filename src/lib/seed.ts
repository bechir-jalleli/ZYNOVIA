import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';
import StudentProject from '@/models/Project';
import Review from '@/models/Review';
import Formation from '@/models/Formation';

export async function ensureAdminExists() {
    await connectToDatabase();

    const adminEmail = 'wnajahi@energyway.fr';
    const adminPassword = '6^o5Ok60k';

    let existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
        const hashedPassword = await hashPassword(adminPassword);
        existingAdmin = await User.create({
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            name: 'Walid Najahi',
        });
        console.log('Admin user created successfully.');
    } else if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('Admin user role synchronized to admin.');
    }

    // Seed Initial Content if empty
    await seedInitialContent();
}

async function seedInitialContent() {
    const formationCount = await Formation.countDocuments();
    if (formationCount === 0) {
        const defaultFormations = [
            {
                title: 'Programme IA — Formation Annuelle',
                type: 'formation',
                description: "Programme complet d'intégration de l'IA dans le cursus scolaire",
                duration: 'Année scolaire',
                level: 'Collège & Lycée',
                image: '/images/banner/image.png',
                price: 95,
                badge: 'Populaire',
                features: ['1h de formation IA par semaine', 'Contenus adaptés collège & lycée']
            },
            {
                title: 'Bootcamp 1 — IA & Problèmes réels',
                type: 'bootcamp',
                description: 'Identification de problèmes réels et conception de solutions',
                duration: '1 semaine',
                level: 'Collège & Lycée',
                image: '/images/banner/img3.jpg',
                startDate: '22/12/2025',
                price: 185,
                badge: 'Bootcamp 1',
                features: ['Identification de problèmes', 'Techniques de traitement']
            }
        ];
        await Formation.insertMany(defaultFormations);
    }

    const projectCount = await StudentProject.countDocuments();
    if (projectCount === 0) {
        const defaultProjects = [
            { name: 'Blog Forge', coverImg: '/images/project/blogforge.webp' },
            { name: 'Gleamer', coverImg: '/images/project/gleamer.webp' }
        ];
        await StudentProject.insertMany(defaultProjects);
    }

    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
        const defaultReviews = [
            {
                imgSrc: '/images/review/daniel.webp',
                name: 'Maman de Sami, 4e',
                rating: 4.9,
                desc: '« Avant ZYNOVIA, mon fils passait beaucoup de temps en ligne sans objectif clair. Aujourd’hui, il utilise l’IA pour créer des projets et a retrouvé confiance en lui à l’école. »',
            },
            {
                imgSrc: '/images/review/sophia.webp',
                name: 'Papa de Lina, Terminale',
                rating: 5,
                desc: '« Ma fille en terminale a découvert des métiers qu’elle ne connaissait pas et a pu présenter un projet d’IA lors d’un oral. Cela l’a beaucoup aidée pour son orientation. »',
            },
            {
                imgSrc: '/images/review/marcus.webp',
                name: 'Responsable pédagogique partenaire',
                rating: 4.8,
                desc: '« ZYNOVIA Academy complète parfaitement nos enseignements. Les élèves développent des projets concrets en IA et gagnent en autonomie comme en motivation. »',
            }
        ];
        await Review.insertMany(defaultReviews);
    }
}

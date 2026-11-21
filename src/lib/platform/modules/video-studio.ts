import type { PlatformModuleManifest } from '../types';

export const videoStudioModule: PlatformModuleManifest = {
	id: 'video-studio',
	version: '5.0.0',
	tier: 'optional',
	category: 'learning',
	nameAr: 'استوديو الفيديو التفاعلي',
	nameFr: 'Studio Vidéo Interactif',
	descriptionAr:
		'دروس مرئية عبر Cloudflare Stream وYouTube مع تفريغ نصي عربي متزامن وقابل للبحث الفوري، وأسئلة تفاعلية مدمجة داخل الفيديو.',
	icon: 'Video',
	routePrefixes: ['/videos', '/admin/videos', '/api/v1/videos'],
	hardDependencies: ['curriculum-core', 'quiz-engine'],
	softDependencies: ['gamification', 'remediation', 'lesson-editor'],
	adminNav: [
		{ id: 'admin-videos', labelAr: 'استوديو الفيديو التفاعلي', href: '/admin/videos', icon: 'Video', order: 48 }
	],
	studentNav: [
		{ id: 'student-videos', labelAr: 'الفيديوهات التفاعلية', href: '/videos', icon: 'Video', order: 25 }
	],
	events: {
		publishes: ['video.cue_answered'],
		subscribes: []
	},
	defaultConfig: {
		autoPauseOnCue: true,
		progressSaveIntervalSec: 10,
		cueCorrectXp: 5
	},
	ownedTables: ['videos', 'video_transcript_segments', 'video_cue_questions', 'video_watch_progress']
};

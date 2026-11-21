import type {
	AssembledSubjectResult,
	KernelSubjectSummary,
	KernelSummary,
	ResolvedSubjectTrack,
	SubjectAssembleRequest,
	SubjectPlugin
} from './types';

export class SubjectRegistry {
	private readonly plugins = new Map<string, SubjectPlugin>();

	register(plugin: SubjectPlugin): void {
		this.plugins.set(plugin.id, plugin);
	}

	get(id: string): SubjectPlugin | undefined {
		return this.plugins.get(id);
	}

	list(): SubjectPlugin[] {
		return Array.from(this.plugins.values());
	}

	resolveForYearSubject(
		yearId: string,
		subjectId: string,
		streamId?: string | null
	): ResolvedSubjectTrack | null {
		for (const plugin of this.plugins.values()) {
			const trackId = plugin.resolveTrack(yearId, subjectId, streamId);
			if (trackId !== null) {
				return { plugin, trackId };
			}
		}
		return null;
	}

	async assembleForYearSubject(
		yearId: string,
		subjectId: string,
		streamId: string | null | undefined,
		opts: Omit<SubjectAssembleRequest, 'trackId'>
	): Promise<AssembledSubjectResult | null> {
		const resolved = this.resolveForYearSubject(yearId, subjectId, streamId);
		if (!resolved) {
			return null;
		}
		const paper = await resolved.plugin.assemble({
			...opts,
			trackId: resolved.trackId
		});
		return {
			plugin: resolved.plugin,
			trackId: resolved.trackId,
			paper
		};
	}

	getKernelSummary(): KernelSummary {
		const subjects: KernelSubjectSummary[] = [];
		let tracks = 0;
		let lessons = 0;
		let templates = 0;

		for (const plugin of this.plugins.values()) {
			const stats = plugin.getStats();
			tracks += stats.tracks;
			lessons += stats.lessons;
			templates += stats.templates;
			subjects.push({
				id: plugin.id,
				nameAr: plugin.nameAr,
				direction: plugin.direction,
				supportedVariants: plugin.supportedVariants,
				stats
			});
		}

		return {
			pluginCount: subjects.length,
			tracks,
			lessons,
			templates,
			subjects
		};
	}
}

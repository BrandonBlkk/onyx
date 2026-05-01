import MiniSection from './MiniSection'
import { previewSections } from './resumeData'

const ResumePreview = ({ candidate, role }) => (
  <div className="h-full w-full overflow-hidden text-zinc-800">
    <div className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2">
      <div className="h-2 w-2 rounded-full bg-zinc-200" />
      <div className="h-2 w-2 rounded-full bg-zinc-200" />
      <div className="h-2 w-2 rounded-full bg-zinc-200" />
      <div className="ml-auto rounded-full border border-zinc-200 px-2 py-0.5 text-[6px] font-medium uppercase tracking-[0.18em] text-zinc-400">
        onyx.dev
      </div>
    </div>

    <div className="p-3">
      <div className="border-b border-zinc-200 pb-2.5 text-center">
        <p className="text-[10px] font-semibold tracking-tight text-zinc-900">{candidate}</p>
        <p className="mt-0.5 text-[7px] uppercase tracking-[0.18em] text-zinc-500">{role}</p>
        <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[6px] text-zinc-400">
          <span>brandon@example.com</span>
          <span>Yangon</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        <div className="space-y-2">
          <MiniSection title={previewSections[0].title} lines={previewSections[0].lines} />
          <MiniSection title={previewSections[1].title} lines={previewSections[1].lines} />
          <MiniSection title={previewSections[3].title} lines={previewSections[3].lines} />
        </div>

        <div className="space-y-2">
          <MiniSection title={previewSections[2].title} lines={previewSections[2].lines} />
          <MiniSection title={previewSections[4].title} lines={previewSections[4].lines} />
          <MiniSection title="Links" lines={['w-10/12', 'w-8/12']} />
        </div>
      </div>
    </div>
  </div>
)

export default ResumePreview

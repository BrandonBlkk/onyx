import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteAccountConfig } from './dangerZoneData'
import DangerZonePanel from './DangerZonePanel'
import { useLanguage } from '../../../context/LanguageContext'

const  DeleteAccountCard = ({ isDark }) => {
  const { t } = useLanguage()
  const [confirmation, setConfirmation] = useState('')
  const [acknowledged, setAcknowledged] = useState(false)

  const isReady =
    confirmation.trim().toUpperCase() === deleteAccountConfig.confirmationPhrase &&
    acknowledged

  return (
    <DangerZonePanel
      title="Delete account"
      description="This permanently removes your Onyx account and all workspace data."
      isDark={isDark}
      tone="danger"
    >
      <div
        className={`rounded-xl border px-4 py-3 ${
          isDark ? 'border-red-950/60 bg-[#12090a]' : 'border-red-200 bg-white'
        }`}
      >
        <p className="text-[13px] font-medium">{t('Type confirmation')}</p>
        <p className={`mt-1 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
          {t('To continue, type {phrase} below.', { phrase: deleteAccountConfig.confirmationPhrase })}
        </p>

        <input
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          placeholder={deleteAccountConfig.confirmationPhrase}
          className={`mt-3 w-full rounded-lg border px-3.5 py-2.5 text-[13px] outline-none transition-colors ${
            isDark
              ? 'border-zinc-800 bg-[#0d0d0e] text-zinc-100 placeholder:text-zinc-600 focus:border-red-900/70'
              : 'border-slate-300 bg-[#fcfcfc] text-slate-950 placeholder:text-slate-400 focus:border-red-300'
          }`}
        />
      </div>

      <label
        className={`mt-4 flex items-start gap-3 rounded-xl border px-4 py-3 ${
          isDark ? 'border-zinc-800 bg-[#0d0d0e]/60' : 'border-slate-200 bg-[#fcfcfc]'
        }`}
      >
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={() => setAcknowledged(!acknowledged)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300"
        />
        <span className={isDark ? 'text-xs text-zinc-400' : 'text-xs text-slate-600'}>
          {t('I understand that deleting this account is permanent and cannot be undone.')}
        </span>
      </label>

      <div className="mt-4 flex flex-wrap gap-2 select-none">
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
            isDark
              ? 'border-zinc-800 bg-transparent text-zinc-300 hover:border-zinc-700'
              : 'border-slate-200 bg-transparent text-slate-700 hover:border-slate-300'
          }`}
        >
          {t('Cancel')}
        </button>

        <button
          type="button"
          disabled={!isReady}
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
            isReady
              ? 'border-red-700 bg-red-600 text-white hover:bg-red-500'
              : isDark
                ? 'cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-500'
                : 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
          }`}
        >
          <Trash2 className="h-3.5 w-3.5" />
          {t('Delete account')}
        </button>
      </div>

      <p className={isDark ? 'mt-3 text-[11px] text-zinc-600' : 'mt-3 text-[11px] text-slate-500'}>
        {t('This button will appear red if you type the correct phrase and acknowledge the warning.')}
      </p>
    </DangerZonePanel>
  )
}

export default DeleteAccountCard

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageSquareText, Star, X } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const maxScreenshotSize = 5 * 1024 * 1024
const acceptedScreenshotTypes = ['image/png', 'image/jpeg', 'image/webp']

const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.onerror = () => reject(new Error('Unable to read the screenshot. Please try again.'))
  reader.readAsDataURL(file)
})

const FeedbackModal = ({ isDark, onClose }) => {
  const { t } = useLanguage()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [message, setMessage] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [screenshotError, setScreenshotError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const screenshotInputRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const originalOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused?.isConnected) previouslyFocused.focus()
    }
  }, [onClose])

  const handleScreenshotChange = (event) => {
    const file = event.target.files?.[0]
    setScreenshotError('')

    if (!file) return

    if (!acceptedScreenshotTypes.includes(file.type)) {
      setScreenshot(null)
      setScreenshotError('Choose a PNG, JPG, or WebP image.')
      event.target.value = ''
      return
    }

    if (file.size > maxScreenshotSize) {
      setScreenshot(null)
      setScreenshotError('Screenshot must be 5 MB or smaller.')
      event.target.value = ''
      return
    }

    setScreenshot(file)
  }

  const removeScreenshot = () => {
    setScreenshot(null)
    setScreenshotError('')
    if (screenshotInputRef.current) screenshotInputRef.current.value = ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const trimmedMessage = message.trim()
    if (!rating || !trimmedMessage || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      const attachmentUrl = screenshot ? await readFileAsDataUrl(screenshot) : null
      const response = await fetch('/onyx/api/v1/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          message: trimmedMessage,
          attachment_url: attachmentUrl,
        }),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to send feedback right now. Please try again.')
      }

      setIsSubmitted(true)
    } catch (submitError) {
      setError(submitError.message || 'Unable to send feedback right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getUploadFieldClass = (isDark) =>
  `mt-2 block cursor-pointer rounded-xl border border-dashed px-4 py-3 transition-colors duration-200 ${
    isDark
      ? 'border-zinc-800 bg-[#0d0d0e]/60 hover:border-zinc-700'
      : 'border-slate-200 bg-[#fcfcfc] hover:border-slate-300'
  }`

  const panelClass = isDark
    ? 'border-zinc-800 bg-zinc-950 text-zinc-100'
    : 'border-slate-200 bg-white text-slate-950'
  const fieldClass = `mt-2 w-full rounded-md border px-3.5 py-3 text-sm outline-none transition-colors ${
    isDark
      ? 'border-zinc-800 bg-zinc-900/70 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-600'
      : 'border-slate-200 bg-slate-50 text-slate-950 placeholder:text-slate-400 focus:border-slate-400'
  }`

  return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label={t('Close feedback form')}
          className="absolute inset-0 cursor-default bg-zinc-950/70"
          onClick={onClose}
        />

        <motion.section
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-modal-title"
          aria-describedby="feedback-modal-description"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={(event) => event.stopPropagation()}
          className={`relative w-full max-w-lg overflow-hidden rounded-lg border shadow-2xl ${panelClass}`}
        >
          <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
            <div>
              <h2 id="feedback-modal-title" className="mt-4 text-xl font-semibold tracking-tight">
                {isSubmitted ? t('Thanks for your feedback') : t('Share your feedback')}
              </h2>
              <p
                id="feedback-modal-description"
                className={`mt-1.5 text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}
              >
                {isSubmitted
                  ? t('Your thoughts help us make Onyx better.')
                  : t('How is Onyx working for you? Your thoughts help us improve.')}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t('Close feedback form')}
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors cursor-pointer ${
                isDark ? 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {isSubmitted ? (
            <div className={`border-t px-5 py-8 text-center sm:px-6 ${isDark ? 'border-zinc-800' : 'border-slate-200'}`}>
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
              <p className="mt-3 text-sm font-medium">{t('Your feedback has been sent.')}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                {t('Close')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`space-y-5 border-t p-5 sm:p-6 ${isDark ? 'border-zinc-800' : 'border-slate-200'}`}>
              <fieldset>
                <legend className={`text-sm font-medium ${isDark ? 'text-zinc-200' : 'text-slate-700'}`}>
                  {t('How would you rate your experience?')}
                </legend>
                <div className="mt-2 flex items-center gap-1" onMouseLeave={() => setHoveredRating(0)}>
                  {[1, 2, 3, 4, 5].map((value) => {
                    const isActive = value <= (hoveredRating || rating)

                    return (
                      <button
                        key={value}
                        type="button"
                        aria-label={t('Rate {rating} out of 5 stars', { rating: value })}
                        aria-pressed={rating === value}
                        onMouseEnter={() => setHoveredRating(value)}
                        onFocus={() => setHoveredRating(value)}
                        onBlur={() => setHoveredRating(0)}
                        onClick={() => setRating(value)}
                        className={`rounded p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 cursor-pointer ${
                          isActive ? 'text-amber-400' : isDark ? 'text-zinc-600' : 'text-slate-300'
                        }`}
                      >
                        <Star className="h-5 w-5" fill={isActive ? 'currentColor' : 'none'} strokeWidth={1.8} />
                      </button>
                    )
                  })}
                  <span className={`ml-2 text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                    {rating ? t('{rating} out of 5', { rating }) : t('Select a rating')}
                  </span>
                </div>
              </fieldset>

              <label className="block">
                <span className={`text-sm font-medium ${isDark ? 'text-zinc-200' : 'text-slate-700'}`}>
                  {t('Tell us more')}
                </span>
                <textarea
                  autoFocus
                  required
                  rows={5}
                  maxLength={2000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={t('What is working well, or what could be better?')}
                  className={`${fieldClass} resize-y`}
                />
                <span className={`mt-1 block text-right text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                  {t('{count} / 2000', { count: message.length })}
                </span>
              </label>

              {error && (
                <p role="alert" className="text-sm text-rose-500">{t(error)}</p>
              )}

              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-zinc-200' : 'text-slate-700'}`}>
                  {t('Screenshot (optional)')}
                </p>
                <label className={getUploadFieldClass(isDark)}>
                  <input
                    ref={screenshotInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleScreenshotChange}
                    className="sr-only"
                  />

                  <span className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] font-medium">
                        {screenshot?.name || t('Attach a screenshot to your feedback.')}
                      </span>
                      <span className={`mt-1 block text-xs ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                        {t('PNG, JPG, or WebP. Maximum size 5 MB.')}
                      </span>
                    </span>

                    <span
                      className={`inline-flex w-fit rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                        isDark
                          ? 'border-zinc-800 bg-zinc-900 text-zinc-300'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      {t(screenshot ? 'Change screenshot' : 'Choose image')}
                    </span>
                  </span>
                </label>
                {screenshot && (
                  <button
                    type="button"
                    onClick={removeScreenshot}
                    className={`mt-2 text-xs transition-colors ${isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {t('Remove screenshot')}
                  </button>
                )}
                {screenshotError && (
                  <p role="alert" className="mt-2 text-xs text-rose-500">{t(screenshotError)}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 select-none">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className={`rounded-md px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${
                    isDark ? 'text-zinc-300 hover:bg-zinc-900' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t('Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !rating || !message.trim()}
                  className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-t-2 border-current" />
                      {t('Sending...')}
                    </>
                  ) : (
                    t('Send feedback')
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.section>
      </motion.div>
  )
}

export default FeedbackModal

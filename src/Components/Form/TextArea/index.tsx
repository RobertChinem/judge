import React, {KeyboardEvent} from "react"


interface TextAreaProps {
    label: string
    name: string
    value: string
    onChange?: (...params: any) => void
    error?: string | null
    rows: number
    disabled?: boolean,
    className?: string
}


function TextArea({ label, name, value, onChange, error, rows, disabled, className }: TextAreaProps) {
    function handleIndentation(textarea: HTMLTextAreaElement) {
        const [start, end] = [textarea.selectionStart, textarea.selectionEnd]
        const append = "      "
        textarea.value = [
            textarea.value.substring(0, start),
            append,
            textarea.value.substring(end)
        ].join('')
        textarea.selectionStart = textarea.selectionEnd = start + append.length;
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === 'Tab') {
            event.preventDefault()
            handleIndentation(event.target as HTMLTextAreaElement)
        }
    }
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea onKeyDown={handleKeyDown} disabled={disabled} value={value} onChange={onChange} className={'form-control ' + className } id={name} rows={rows}></textarea>
            {error && <p className="text-danger">{error}</p>}
        </div>
    )
}

export default TextArea

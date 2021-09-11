import React from "react"


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
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <textarea disabled={disabled} value={value} onChange={onChange} className={'form-control ' + className } id={name} rows={rows}></textarea>
            {error && <p className="text-danger">{error}</p>}
        </div>
    )
}

export default TextArea

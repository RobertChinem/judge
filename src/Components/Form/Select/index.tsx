import React from 'react'


interface Option {
    value: string | number
    label: string
}


interface SelectProps {
    options: Option[]
    label: string
    name: string
    value: string
    onChange: (...a: any) => void
    error: string | null
}


function Select({ options, label, name, value, onChange, error }: SelectProps) {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <select value={value} onChange={onChange} className="form-select" id={name} required>
                {
                    options.map(({ value, label }) => <option key={value} value={value}>{label}</option>)
                }
            </select>
            {error && <p className="text-danger">{error}</p>}
        </div>
    )
}

export default Select

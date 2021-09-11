import React from 'react'


const useForm = () => {
	const [value, setValue] = React.useState<string>('')
	const [error, setError] = React.useState<string|null>(null)

	function validate(value: string) {

		if(value.length === 0){
			setError('Preencha um valor.')
			return false
		}
		else{
			setError(null)
			return true
		}
	}

	function onChange({target}: any){
		if(error) validate(target.value)
		setValue(target.value)
	}

	return {
		value,
		setValue,
		onChange,
		error,
		validate: () => validate(value),
		onBlur: () => validate(value)
	}
}

export default useForm

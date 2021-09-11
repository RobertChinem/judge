import React from 'react';
import './App.css';
import Select from './Components/Form/Select';
import useFetch from './Hooks/useFetch';
import useForm from './Hooks/useForm';
import TextArea from './Components/Form/TextArea';
import { Language } from './Models/Language';
import { Submission } from './Models/Submission'
import { GET_LANGUAGES, POST_SUBMISSION } from './api'


interface StdoutState {
    message: string,
    error: boolean
}


function App() {
    const { request, loading } = useFetch()

    const [languages, setLanguages] = React.useState<Language[]>([])
    const language = useForm()
    const code = useForm()
    const stdin = useForm()
    const [stdout, setStdout] = React.useState<StdoutState>({ message: '', error: false })

    function utf8_to_b64(str: string) {
        return window.btoa(unescape(encodeURIComponent(str)))
    }

    function b64_to_utf8(str: string) {
        return decodeURIComponent(escape(window.atob(str)))
    }

    async function handleSubmit() {
        const isValid = [language.validate, code.validate].every(fn => fn())
        if (!isValid) return

        const { url, options } = POST_SUBMISSION({
            source_code: utf8_to_b64(code.value),
            language_id: Number(language.value),
            stdin: utf8_to_b64(stdin.value)
        })
        const { json } = await request(url, options)
        const submission = json as Submission
        if (submission.stderr) {
            setStdout({
                message: `Error: ${b64_to_utf8(submission.stderr)}`,
                error: true
            })
        }
        else {
            setStdout({
                message: b64_to_utf8(submission.stdout!),
                error: false
            })
        }
    }


    React.useEffect(() => {
        async function fetchLanguages() {
            const { url, options } = GET_LANGUAGES()
            const { json } = await request(url, options)
            setLanguages(json as Language[])
        }
        fetchLanguages()
    }, [request])


    return (
        <div className="App container my-5">
            <div className="row d-flex justify-content-center">
                <div className="col-6 text-center">
                    <h1 className="mb-5">GRUB - Online Compiler</h1>
                    <Select
                        options={languages.map((lang) => ({ value: lang.id, label: lang.name }))}
                        label="Linguagem"
                        name="language"
                        value={language.value}
                        onChange={language.onChange}
                        error={language.error}
                    />
                    <TextArea label="Código" name="code" value={code.value} onChange={code.onChange} error={code.error} rows={10} />

                    <div className="row">
                        <div className="col-6">
                            <TextArea label="Input" name="input" value={stdin.value} onChange={stdin.onChange} error={stdin.error} rows={3} />
                        </div>
                        <div className="col-6">
                            <TextArea disabled={true} className={stdout.error ? 'text-danger' : ''} label="Output" name="output" value={stdout.message} rows={3} />
                        </div>
                    </div>


                    <div className="row mt-4">
                        {!loading ? (
                            <button onClick={handleSubmit} className="btn btn-lg btn-primary">Executar</button>
                        ) : (
                            <button disabled={true} className="btn btn-lg btn-primary">Carregando...</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;

import React from 'react'
import { GET_LANGUAGES, POST_SUBMISSION } from '../../api'
import Select from '../Form/Select'
import TextArea from '../Form/TextArea'
import useFetch from '../../Hooks/useFetch'
import useForm from '../../Hooks/useForm'
import { Language } from '../../Models/Language'
import { Submission } from '../../Models/Submission'

declare var bootstrap: any


interface StdoutState {
    message: string,
    error: boolean
}

const Compiler: React.FC = () => {
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

    function changeTab(tabName: string){
        const someTabTriggerEl = document.querySelector(`#${tabName}`)
        const tab = new bootstrap.Tab(someTabTriggerEl)
        tab.show()
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


        if (submission.compile_output) {
            setStdout({
                message: `Error: ${b64_to_utf8(submission.compile_output)}`,
                error: true
            })
        }
        else if (submission.stderr) {
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
        changeTab('nav-output-tab')
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
        <div>
            <Select
                options={languages.map((lang) => ({ value: lang.id, label: lang.name }))}
                label="Linguagem"
                name="language"
                value={language.value}
                onChange={language.onChange}
                error={language.error}
            />
            <TextArea label="Código" name="code" value={code.value} onChange={code.onChange} error={code.error} rows={10} />

            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-input-tab" data-bs-toggle="tab" data-bs-target="#nav-input" type="button" role="tab" aria-controls="nav-input" aria-selected="true">Input</button>
                    <button className="nav-link" id="nav-output-tab" data-bs-toggle="tab" data-bs-target="#nav-output" type="button" role="tab" aria-controls="nav-output" aria-selected="false">Output</button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-input" role="tabpanel" aria-labelledby="nav-input-tab">
                    <TextArea label="" name="input" value={stdin.value} onChange={stdin.onChange} error={stdin.error} rows={5} />
                </div>
                <div className="tab-pane fade" id="nav-output" role="tabpanel" aria-labelledby="nav-output-tab">
                    <TextArea disabled={true} className={stdout.error ? 'text-danger' : ''} label="" name="output" value={stdout.message} rows={5} />
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
    )
}

export default Compiler

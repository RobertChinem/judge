export interface Submission {
    source_code: string
    language_id: number
    stdin?: string
    stderr?: string
    stdout?: string
    compile_output?: string
}
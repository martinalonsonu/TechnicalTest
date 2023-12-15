export interface Root {
    record: Record
    metadata: Metadata
}

export interface Record {
    notes: Note[]
}

export interface Note {
    id: string
    date: string
    title: string
    autor: string
    section: string
    image: string
    type: string
}

export interface Metadata {
    id: string
    private: boolean
    createdAt: string
    name: string
}

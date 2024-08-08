interface Params {
  params: {
    id: string
  }
}
export default function ViewPage({ params }: Params) {
  return <div>View post: {params.id}</div>
}
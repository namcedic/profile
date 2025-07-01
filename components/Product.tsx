'use client'

import React, { useEffect, useState } from 'react'
import { Pagination, Spin, List, Card } from 'antd'
import { useSearchParams, useRouter } from 'next/navigation'

const PAGE_SIZE = 10

const data = Array.from({ length: 23 }).map((_, i) => ({
	name: `item ${i}`,
	description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.'
}))

const ProductPage = () => {
	const [products, setProducts] = useState<any[]>([])
	const [total, setTotal] = useState(0)

	const searchParams = useSearchParams()
	const router = useRouter()

	const page = parseInt(searchParams.get('page') || '1', 10)

	const fetchData = async (page: number) => {
		const start = (page - 1) * PAGE_SIZE
		const end = start + PAGE_SIZE

		const pagedData = data.slice(start, end)
		setProducts(pagedData)
		setTotal(data.length)
	}

	useEffect(() => {
		void fetchData(page)
	}, [page])

	const onChangePage = (pageNumber: number) => {
		router.push(`?page=${pageNumber}`)
	}

	return (
		<div style={{ padding: 24 }}>
			<h2>Danh sách sản phẩm</h2>
			{
				<List
					grid={{
						gutter: 16,
						xs: 1,
						sm: 2,
						md: 2,
						lg: 3,
						xl: 4,
						xxl: 4
					}}
					dataSource={products}
					renderItem={(item) => (
						<List.Item>
							<Card title={item.name}>{item.description}</Card>
						</List.Item>
					)}
				/>
			}
			<Pagination
				current={page}
				pageSize={PAGE_SIZE}
				total={total}
				onChange={onChangePage}
				style={{ marginTop: 16, textAlign: 'center' }}
			/>
		</div>
	)
}

export default ProductPage

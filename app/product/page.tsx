import React, { Suspense } from 'react'
import ProductPage from '@/components/Product'

export default function Page() {
	return (
		<Suspense fallback={<div style={{ padding: 24 }}>Đang tải sản phẩm...</div>}>
			<ProductPage />
		</Suspense>
	)
}

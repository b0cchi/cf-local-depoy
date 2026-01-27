export default function Home() {
	const secretKey = process.env.SECRET_KEY || "SECRET_KEYが設定されていません";
	console.log(secretKey); // デバッグ用にSECRET_KEYをコンソールに表示
	return (
		<div className="flex justify-center items-center p-8 min-h-screen font-sans">
			<main className="flex flex-col items-center gap-8">
				<div className="bg-blue-50 dark:bg-blue-900 p-4 rounded">
					<p className="font-mono text-blue-900 dark:text-blue-100 text-sm">
						<span className="font-bold">SECRET_KEY:</span> {secretKey}
					</p>
				</div>
			</main>
		</div>
	);
}

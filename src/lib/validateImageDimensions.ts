function validateImageDimensions(file: File, minWidth: number, minHeight: number): Promise<boolean> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const img = new Image()
            img.onload = () => {
                const isValid = img.width >= minWidth && img.height >= minHeight
                resolve(isValid)
            }
            img.onerror = () => resolve(false)
            img.src = e.target?.result as string
        }
        reader.readAsDataURL(file)
    })
}

export default validateImageDimensions
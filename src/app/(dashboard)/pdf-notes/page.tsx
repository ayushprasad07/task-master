"use client"

const PdfNotes = () => {
  return (
    <div className="p-2 md:p-4 w-full">
        <div className="w-full">
            <h1 className="text-2xl font-bold md:text-4xl text-center">PDF Notes</h1>
            <div className="w-full flex justify-between items-center mt-4">
                <div>
                    <p className="font-semibold">Your PDF Notes</p>
                </div>
                <div>
                    <p>Button</p>
                </div>
            </div>
            <hr className="mt-4"/>
            
        </div>
    </div>
  )
}

export default PdfNotes

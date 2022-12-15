function CompleteComp({ continueToNextSet }) {
    return (
        <div className="rounded m-5 p-10 bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-800 dark:to-blue-600">
            <h1 className="text-2xl mt-5 mb-5 text-center dark:text-white font-extrabold">Displaying complete comp!</h1>
            <div className="text-center">
                <button onClick={continueToNextSet} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Continue to the next set!</button>
            </div>
        </div>
    );
}

export default CompleteComp;
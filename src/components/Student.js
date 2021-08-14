import React, { useState } from 'react'


const Student = ({ student }) => {

    const ave = (arr) => arr.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0) / arr.length;
    const [showGrades, setShowGrades] = useState(false);
    const [newTag, setNewTag] = useState("");

    const addTag = (e) => {
        if (e.key === "Enter" && newTag !== null) {
            student.tags = [...student.tags, newTag]
            e.target.value = null;
        }
        setNewTag(e.target.value);
    };
    return (
        <div className="border-b-2 border-gray-700">
            <div className="flex py-4">
                <div className="py-4">
                    <img
                        className="mx-4 rounded-full border-2 h-24 w-24 flex justify-center"
                        src={student.pic}
                        alt="pic"
                    />
                </div>
                <div className="flex justify-between w-full px-2">
                    <div>
                        <div className="text-3xl px-4">
                            {student.firstName.toUpperCase() +
                                " " +
                                student.lastName.toUpperCase()}
                        </div>
                        <div className="px-8">
                            <div>Eamil: {student.email}</div>
                            <div>Compant: {student.company}</div>
                            <div>Skills: {student.skill}</div>
                            <div>Average: {ave(student.grades)}%</div>
                            
                            <div>
                                {
                                    student.tags.length > 0
                                        &&
                                        <div className="flex">
                                            {student.tags.map((tag, index) => {
                                                return <div key={index} className="bg-gray-700 px-2 mx-2 rounded"> {tag} </div>;
                                            })}
                                        </div>
                                }
                            </div>

                            <div>
                                <input
                                    className='bg-gray-500 px-2 my-2 border-b h-6 focus:outline-none focus:ring focus:border-blue-300'
                                    placeholder="Add a tag"
                                    type="text"
                                    value={newTag}
                                    onChange={e => { setNewTag(e.target.value); }}
                                    onKeyDown={addTag}
                                />
                            </div>

                            <div className="px-2 text-gray-400">
                                {
                                    (showGrades) &&
                                    student.grades.map((grade, index) =>
                                        <div key={index}>test {index + 1}
                                            <span className='mx-8' >{grade}%</span>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="my-2">
                        <button
                            className="hover:text-white text-gray-700"
                            onClick={() => setShowGrades(!showGrades)}
                        >
                            {showGrades ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20 12H4"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Student

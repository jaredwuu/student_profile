import React, { useEffect, useState } from 'react'
import Frame from './Frame'
import Student from './Student'
import SearchBar from './SearchBar'

const Students = () => {
    const [data, setData] = useState([])
    const [searchContent, setSearchContent] = useState([]);
    const [nameSearch, setNameSearch] = useState([]);
    const [tagSearch, setTagSearch] = useState([]);

    const searchNameFunction = (name) => {
        let newNameSearch = [];
        data.map(student => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            if (fullName.includes(name)) {
                newNameSearch.push(student);
            }
            return fullName.includes(name)
        });
        let contentSearch = [];
        tagSearch.map(student => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            if (fullName.includes(name)) {
                contentSearch.push(student);
            }
            return fullName.includes(name)
        });
        setSearchContent(contentSearch);
        setNameSearch(newNameSearch);
    }

    const searchTagFunction = (myTag) => {
        if (myTag) {
            let newTagSearch = [];
            let newContentSearch = [];
            data.map(student => {
                if (student.tags.join(',').includes(myTag)) {
                    newTagSearch.push(student);
                }
                return student.tags.join(',').includes(myTag)

            });
            nameSearch.map(student => {
                if (student.tags.join(',').includes(myTag)) {
                    newContentSearch.push(student);
                }
                return student.tags.join(',').includes(myTag)

            });
            setSearchContent(newContentSearch);
            setTagSearch(newTagSearch);
        } else {
            setSearchContent(nameSearch);
            setTagSearch(data);
        }
    }

    useEffect(() => {
        fetch(`https://api.hatchways.io/assessment/students`)
            .then((res) => res.json())
            .then((data) => {
                let newData = [];
                data.students.map(student => {
                    let newStudent = student;
                    newStudent.tags = [];
                    newData.push(newStudent);
                    return newData
                })
                setData(newData);
                setSearchContent(newData);
                setNameSearch(newData);
                setTagSearch(newData);
            });
    }, []);

    return (
        <Frame >
            <SearchBar searchFunction={searchNameFunction} content={`name`} />
            <SearchBar searchFunction={searchTagFunction} content={`tag`} />
            <ul className="overflow-y-auto" style={{ height: "480px" }}>
                {searchContent.map((student) => {
                    return (
                        <div key={student.id}>
                            < Student
                                key={student.id}
                                student={student}
                            />
                        </div>
                    )
                })}
            </ul>
        </Frame>
    )
}

export default Students

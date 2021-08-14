import React, { useEffect, useState } from 'react'
import Frame from './Frame'
import Student from './Student'
import SearchBar from './SearchBar'
const Students = () => {
    const [data, setData] = useState([])

    const [filterContent, setFilterContent] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [tagFilter, setTagFilter] = useState([]);

    const searchNameFunction = (name) => {
        let newNameFilter = [];
        data.map(student => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            if (fullName.includes(name)) {
                newNameFilter.push(student);
            }
            return fullName.includes(name)
        });
        let contentFilter = [];
        tagFilter.map(student => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            if (fullName.includes(name)) {
                contentFilter.push(student);
            }
            return fullName.includes(name)
        });
        setFilterContent(contentFilter);
        setNameFilter(newNameFilter);
    }

    const searchTagFunction = (tag) => {
        if (tag) {
            let newTagFilter = [];
            let newContentFilter = [];
            data.map(student => {
                let tagged = false;
                student.tags.map(tag => {
                    if (tag.includes(tag)) {
                        tagged = true;
                    }
                    
                });
                if (tagged) {
                    newTagFilter.push(student);
                }
                return tagged;
                
            });

            filterContent.map(student => {
                let tagged = false;
                student.tags.map(tag => {
                    if (tag.includes(tag)) {
                        tagged = true;
                    }
                    
                });
                if (tagged) {
                    newContentFilter.push(student);
                }
                
            });
            setFilterContent(newContentFilter);
            setTagFilter(newTagFilter);
        } else {
            setFilterContent(nameFilter);
            setTagFilter(data);
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
                setFilterContent(newData);
                setNameFilter(newData);
                setTagFilter(newData);
            });
    }, []);



    return (
        <Frame >
            <SearchBar searchFunction={searchNameFunction} content={`name`} />
            <SearchBar searchFunction={searchTagFunction} content={`tag`} />

            <ul className="overflow-y-auto" style={{ height: "480px" }}>

                {filterContent.map((student, index) => {
                    return (
                        <div key={student.id}>
                            < Student
                                key={student.id}
                                index={index}
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

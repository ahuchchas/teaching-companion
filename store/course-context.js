import { createContext, useReducer } from "react";

const DUMMY_COURSES = [
  {
    courseId: "course1",
    courseTitle: "Compiler Design & Construction",
    courseCode: "CSE-3315",
    topicList: [
      {
        topicId: "topic1",
        topicName: "First and Follow",
        isCompleted: true,
        classNeeded: 2,
      },
      {
        topicId: "topic2",
        topicName: "Left recursion",
        isCompleted: true,
        classNeeded: 1,
      },
      {
        topicId: "topic3",
        topicName: "Left factoring",
        isCompleted: true,
        classNeeded: 1,
      },
      {
        topicId: "topic4",
        topicName: "LL(1) Parsing",
        isCompleted: false,
        classNeeded: 2,
      },
      {
        topicId: "topic5",
        topicName: "LR(0) Parsing",
        isCompleted: false,
        classNeeded: 2,
      },
      {
        topicId: "topic6",
        topicName: "Syntax analysis",
        isCompleted: false,
        classNeeded: 1,
      },
      {
        topicId: "topic7",
        topicName: "Lexical analysis",
        isCompleted: false,
        classNeeded: 1,
      },
    ],
  },

  {
    courseId: "course2",
    courseTitle: "Compiler Design & Construction",
    courseCode: "CSE-3315",
    topicList: [
      {
        topicId: "topic1",
        topicName: "First and Follow",
        isCompleted: true,
        classNeeded: 2,
      },
      {
        topicId: "topic2",
        topicName: "Left recursion",
        isCompleted: true,
        classNeeded: 1,
      },
      {
        topicId: "topic3",
        topicName: "Left factoring",
        isCompleted: true,
        classNeeded: 1,
      },
      {
        topicId: "topic4",
        topicName: "LL(1) Parsing",
        isCompleted: false,
        classNeeded: 2,
      },
      {
        topicId: "topic5",
        topicName: "LR(0) Parsing",
        isCompleted: false,
        classNeeded: 2,
      },
      {
        topicId: "topic6",
        topicName: "Syntax analysis",
        isCompleted: false,
        classNeeded: 1,
      },
      {
        topicId: "topic7",
        topicName: "Lexical analysis",
        isCompleted: false,
        classNeeded: 1,
      },
    ],
  },

  {
    courseId: "course3",
    courseTitle: "Compiler Design & Construction",
    courseCode: "CSE-3315",
    topicList: [
      {
        topicId: "topic1",
        topicName: "First and Follow",
        isCompleted: true,
        classNeeded: 2,
      },
      {
        topicId: "topic2",
        topicName: "Left recursion",
        isCompleted: true,
        classNeeded: 1,
      },
      {
        topicId: "topic3",
        topicName: "Left factoring",
        isCompleted: true,
        classNeeded: 1,
      },
      {
        topicId: "topic4",
        topicName: "LL(1) Parsing",
        isCompleted: false,
        classNeeded: 2,
      },
      {
        topicId: "topic5",
        topicName: "LR(0) Parsing",
        isCompleted: false,
        classNeeded: 2,
      },
      {
        topicId: "topic6",
        topicName: "Syntax analysis",
        isCompleted: false,
        classNeeded: 1,
      },
      {
        topicId: "topic7",
        topicName: "Lexical analysis",
        isCompleted: false,
        classNeeded: 1,
      },
    ],
  },
];

export const CoursesContext = createContext();

function coursesReducer(state, action) {
  if (action.type === "ADD") {
    const courseId = new Date().toString() + Math.random().toString();
    return [{ ...action.payload, courseId: courseId }, ...state];
  } else if (action.type === "DELETE") {
    return state.filter((course) => course.courseId !== action.payload);
  } else if (action.type === "UPDATE") {
    const updatableCourseIndex = state.findIndex(
      (course) => course.courseId === action.payload.courseId
    );
    const updatableCourse = state[updatableCourseIndex];
    const updatedItem = {
      ...updatableCourse,
      ...action.payload.courseData,
    };
    const updatedCourses = [...state];
    updatedCourses[updatableCourseIndex] = updatedItem;

    return updatedCourses;
  } else if (action.type === "ADD_TOPIC") {
    const updatableCourseIndex = state.findIndex(
      (course) => course.courseId === action.payload.courseId
    );
    const updatableCourse = state[updatableCourseIndex];
    const topicId = new Date().toString() + Math.random().toString();
    updatableCourse.topicList.push({
      ...action.payload.topicData,
      topicId: topicId,
    });

    const updatedCourses = [...state];
    updatedCourses[updatableCourseIndex] = updatableCourse;

    return updatedCourses;
  } else if (action.type === "DELETE_TOPIC") {
    const updatableCourseIndex = state.findIndex(
      (course) => course.courseId === action.payload.courseId
    );
    const newTopicList = state[updatableCourseIndex].topicList.filter(
      (topic) => topic.topicId !== action.payload.topicId
    );

    const updatableCourse = {
      ...state[updatableCourseIndex],
      topicList: newTopicList,
    };

    const updatedCourses = [...state];
    updatedCourses[updatableCourseIndex] = updatableCourse;

    return updatedCourses;
  } else if (action.type === "MARK_TOPIC") {
    const updatableCourseIndex = state.findIndex(
      (course) => course.courseId === action.payload.courseId
    );
    const updatableCourse = state[updatableCourseIndex];

    updatableCourse.topicList.map((topic) => {
      if (topic.topicId === action.payload.topicId) {
        topic.isCompleted = !topic.isCompleted;
      }
    });

    const updatedCourses = [...state];
    updatedCourses[updatableCourseIndex] = updatableCourse;

    return updatedCourses;
  }
}

export default function CoursesContextProvider({ children }) {
  const [coursesState, dispatch] = useReducer(coursesReducer, DUMMY_COURSES);

  function addCourse(courseData) {
    dispatch({ type: "ADD", payload: courseData });
  }

  function deleteCourse(courseId) {
    dispatch({ type: "DELETE", payload: courseId });
  }

  function updateCourse(courseId, courseData) {
    dispatch({
      type: "UPDATE",
      payload: {
        courseId: courseId,
        courseData: courseData,
      },
    });
  }

  function addTopic(courseId, topicData) {
    dispatch({
      type: "ADD_TOPIC",
      payload: {
        courseId: courseId,
        topicData: topicData,
      },
    });
  }
  function deleteTopic(courseId, topicId) {
    dispatch({
      type: "DELETE_TOPIC",
      payload: {
        courseId: courseId,
        topicId: topicId,
      },
    });
  }
  function markTopic(courseId, topicId) {
    dispatch({
      type: "MARK_TOPIC",
      payload: {
        courseId: courseId,
        topicId: topicId,
      },
    });
  }
  const value = {
    courses: coursesState,
    addCourse: addCourse,
    deleteCourse: deleteCourse,
    updateCourse: updateCourse,
    addTopic: addTopic,
    deleteTopic: deleteTopic,
    markTopic: markTopic,
  };

  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
}

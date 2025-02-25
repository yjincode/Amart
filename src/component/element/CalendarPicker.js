import DatePicker from "react-multi-date-picker";

export default function CalendarPicker({ dates, setDates, label, isMultiple }) {
    const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
    const months = [
        "1월", "2월", "3월", "4월", "5월", "6월",
        "7월", "8월", "9월", "10월", "11월", "12월"
    ];

    // ✅ 날짜를 "YYYY-MM-DD" 형식으로 변환하는 함수
    const formatDates = (selectedDates, isMultiple) => {
        if (!selectedDates) return isMultiple ? [] : ""; 
        if (Array.isArray(selectedDates)) {
            return isMultiple 
                ? selectedDates.map(date => date.format("YYYY-MM-DD")) 
                : selectedDates[0].format("YYYY-MM-DD"); 
        }
        return selectedDates.format("YYYY-MM-DD"); 
    }

    // ✅ 날짜를 "3일(토)" 형식으로 변환하는 함수
    const formatDateForDisplay = (date) => {
        if (!date) return "";
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const weekDay = ["일", "월", "화", "수", "목", "금", "토"][dateObj.getDay()];
        return `${day}일(${weekDay})`;
    };

    return (
        <div className="seller-page-calendar-div">
            <p>{label}</p>
            <DatePicker
                value={dates}
                onChange={(selectedDates) => {
                    const formattedDates = formatDates(selectedDates, isMultiple);
                    setDates(formattedDates);
                }}
                multiple={isMultiple} 
                format="YYYY-MM-DD"
                className="red"
                months={months}
                weekDays={weekDays}
                render={(value, openCalendar) => (
                    <button
                        type="button"
                        onClick={() => setTimeout(() => openCalendar(), 0)}
                        className="custom-date-button"
                    >
                        클릭해서 날짜 선택하기
                    </button>
                )}
            />
            <p style={{ fontSize: "14px" }}>
                선택한 날짜: {Array.isArray(dates) ? dates.map(date => formatDateForDisplay(date)).join(", ") : formatDateForDisplay(dates)}
            </p>
        </div>
    );
}

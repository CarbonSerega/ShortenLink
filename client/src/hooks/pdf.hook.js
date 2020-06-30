import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable"
import {useCallback} from "react"

export const usePdf = () => {
    return useCallback(links => {
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";

        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Links"
        const headers = [["#", "Original", "Shortened", "Clicks"]];

        const data = links.map((l, i)=> [i+1, l.from, l.to, l.clicks]);

        let content = {
            startY: 0,
            head: headers,
            body: data
        };

        doc.text(title, 40, 0);
        doc.autoTable(content);
        doc.save("Links report.pdf")
    }, [])
}
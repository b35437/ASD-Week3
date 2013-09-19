function(doc) {
	if (doc._id.substr(0,5) === "level") {
		emit(doc._id.substr(6), {
			"name": doc.name,
			"slot": doc.slot,
			"level": doc.level,
			"note": doc.note
		});
	}
}
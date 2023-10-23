function AutocompleteBairros({ inputValue, onInputChange, onSelect }) {
    const [bairros, loading, error] = useCollection(db.collection('bairro'));
  
    if (loading) {
      return <CircularProgress />;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <Autocomplete
        options={bairros.docs.map((doc) => doc.data().nome)}
        freeSolo
        inputValue={inputValue}
        onInputChange={onInputChange}
        renderInput={(params) => (
          <InputBase
            {...params}
            placeholder="Buscar por bairro"
            inputRef={inputRef}
            className={classes.input}
          />
        )}
        onSelect={onSelect}
      />
    );
  }
  